namespace Entities.Responses
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
    }
    public enum Gender
    {
        NOT_SPECİFİED = 0,
        MALE = 1,
        FEMALE = 2
    }
}
