using System;

namespace ExamApp.Domain
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public Guid TestId { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }
        public int CorrectAnswer { get; set; }
    }
}
