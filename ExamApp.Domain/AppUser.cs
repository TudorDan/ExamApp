using Microsoft.AspNetCore.Identity;

namespace ExamApp.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
