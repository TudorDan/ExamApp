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
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        question = "Not found"
                    });

                _context.Remove(question);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
