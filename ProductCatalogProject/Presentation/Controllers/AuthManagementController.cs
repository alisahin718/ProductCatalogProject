using EmailService.Contracts;
using EmailService.MessageModel;
using Entities.DataTransferObject;
using Entities.Models;
using Entities.RegistractionModels;
using Entities.Resources;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenGenerator _tokenGenerator;

        private readonly IEmailSender _emailSender;
        private readonly IBackgroundJobClient _backgroundJobClient;


        public AuthManagementController(UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            TokenGenerator tokenGenerator, 
            IEmailSender emailSender, 
            IBackgroundJobClient backgroundJobClient)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenGenerator = tokenGenerator;
            _emailSender = emailSender;
            _backgroundJobClient = backgroundJobClient;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto user)
        {
            if (ModelState.IsValid)
            {

                var existingUser = await _userManager.FindByEmailAsync(user.Email);

                if (existingUser != null)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = "E-posta zaten kullanımda!",
                        Success = false
                    });
                }

                var newUser = new User()
                {
                    Email = user.Email,
                    UserName = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = Gender.MALE

                };
                var isCreated = await _userManager.CreateAsync(newUser, user.Password);
                if (isCreated.Succeeded)
                {
                    var jwtToken = _tokenGenerator.CreateToken(newUser);


                    var message = new Message(user.Email, "Primefor --Ürün Katalog Projesi-- Hoşgeldiniz!", "Üyeliğiniz gerçekleştirilmiştir, aramıza hoşgeldiniz");
                    _backgroundJobClient.Enqueue<IEmailSender>(x => x.SendEmailAsync(message));

                    return Ok(new RegistrationResponse()
                    {
                        Success = true,
                        Token = jwtToken
                    });
                }
                else
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = isCreated.Errors.Select(x => x.Description).FirstOrDefault(),
                        Success = false
                    });
                }
            }

            return BadRequest(new RegistrationResponse()
            {
                Errors = "Geçersiz Bilgiler!",
                Success = false
            });
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);

                if (existingUser == null)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = "Hatalı Mail Adresi Girdiniz!",
                        Success = false
                    });
                }
                if (await _userManager.IsLockedOutAsync(existingUser))
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = "Hesabınız bloke edilmiştir. Lütfen daha sonra tekrar deneyin.",
                        Success = false
                    });
                }

                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);
                var singInResult = await _signInManager.CheckPasswordSignInAsync(existingUser, user.Password, false);

                if (!isCorrect)
                {

                    await _userManager.AccessFailedAsync(existingUser);

                    if (await _userManager.GetAccessFailedCountAsync(existingUser) >= 3)
                    {
                        await _userManager.SetLockoutEndDateAsync(existingUser, DateTimeOffset.UtcNow.AddMinutes(10)); // 3 başarısız giriş denemesinden sonra hesabı 10 dakika boyunca bloke et

                        var blokeMessage = new Message(existingUser.Email, "Hesabınız Bloke Edildi", "Hesabınız 3 kez yanlış şifre girişi nedeniyle bloke edilmiştir. 10 dakika sonra tekrar deneyebilirsiniz.");
                        _backgroundJobClient.Enqueue<IEmailSender>(x => x.SendEmailAsync(blokeMessage));

                        return BadRequest(new RegistrationResponse()
                        {
                            Errors = "Hesabınız bloke edilmiştir. Lütfen 10 dakika sonra tekrar deneyin.",
                            Success = false
                        });
                    }

                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = "Hatalı Şifre",
                        Success = false
                    });
                }



                await _userManager.ResetAccessFailedCountAsync(existingUser); // AccessFailedCount değerini sıfırla

                await _signInManager.SignInAsync(existingUser, false);

                var jwtToken = _tokenGenerator.CreateToken(existingUser);
                var existingUserID = await _userManager.FindByEmailAsync(user.Email);
                if (existingUserID != null)
                {
                    var userId = existingUserID.Id;



                    return Ok(new RegistrationResponse()
                    {
                        UserId = userId,
                        Success = true,
                        Token = jwtToken
                    });
                }
            }

            return BadRequest(new RegistrationResponse()
            {
                Errors = "Geçersiz Modelstate!",
                Success = false
            });
        }



        [HttpGet("CurrentUser")]
        public CurrentUser CurrentUserInfo()
        {
            
            return new CurrentUser
            {
                IsAuthenticated = User.Identity.IsAuthenticated,
                UserName = User.Identity.Name
            };
        }
    }
}
