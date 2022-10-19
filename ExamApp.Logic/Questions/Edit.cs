using ExamApp.Data;
using ExamApp.Logic.Errors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Questions
{
    public class Edit
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        question = "Not found"
                    });
                }

                question.Content = request.Content ?? question.Content;
                question.Answer1 = request.Answer1 ?? question.Answer1;
                question.Answer2 = request.Answer2 ?? question.Answer2;
                question.Answer3 = request.Answer3 ?? question.Answer3;
                question.Answer4 = request.Answer4 ?? question.Answer4;
                question.CorrectAnswer = request.CorrectAnswer > 0 && request.CorrectAnswer < 5 
                    ? request.CorrectAnswer : question.CorrectAnswer;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
