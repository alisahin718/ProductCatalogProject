using EmailService.MessageModel;

namespace EmailService.Contracts
{
    public interface IEmailSender
    {
        Task SendEmailAsync(Message message);
    }
}
