using EmailService.Contracts;
using EmailService.MessageModel;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    [Authorize]
    public class MailController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        private readonly IBackgroundJobClient _backgroundJobClient;

        public MailController(IEmailSender emailSender, IBackgroundJobClient backgroundJobClient)
        {
            _emailSender = emailSender;
            _backgroundJobClient = backgroundJobClient;
        }

        [HttpGet]


        public IActionResult SendMail()
        {
            var message = new Message("sahin.ali718@gmail.com", "Urun Katalog Uygulaması", "Deneme maili!");
            // _emailSender.SendEmailAsync(message);
            // _backgroundJobClient.Schedule<IEmailSender> (x => x.SendEmailAsync(message), new DateTimeOffset(DateTime.Now));
            _backgroundJobClient.Enqueue<IEmailSender>(x => x.SendEmailAsync(message));
            return Ok();
        }
    }
}
