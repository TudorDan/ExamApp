using ExamApp.Domain;

namespace ExamApp.Logic.Interfaces
{
    public interface IJWTGenerator
    {
        string CreateToken(AppUser user);
    }
}
