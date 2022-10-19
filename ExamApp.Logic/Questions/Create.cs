using ExamApp.Data;
using ExamApp.Domain;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Questions
{
    public class Create
    {
        public class Command : IRequest
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

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(t => t.Content).NotEmpty();
                RuleFor(t => t.Answer1).NotEmpty();
                RuleFor(t => t.Answer2).NotEmpty();
                RuleFor(t => t.Answer3).NotEmpty();
                RuleFor(t => t.Answer4).NotEmpty();
                RuleFor(t => t.CorrectAnswer).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = new Question
                {
                    Id = request.Id,
                    Content = request.Content,
                    TestId = request.TestId,
                    Answer1 = request.Answer1,
                    Answer2 = request.Answer2,
                    Answer3 = request.Answer3,
                    Answer4 = request.Answer4,
                    CorrectAnswer = request.CorrectAnswer
                };

                _context.Questions.Add(question);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
