using ExamApp.Data;
using ExamApp.Logic.Errors;
using FluentValidation;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Tests
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(t => t.Title).NotEmpty();
                RuleFor(t => t.Description).NotEmpty();
                RuleFor(t => t.Category).NotEmpty();
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
                var test = await _context.Tests.FindAsync(request.Id);

                if (test == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not found"
                    });

                test.Title = request.Title ?? test.Title;
                test.Description = request.Description ?? test.Description;
                test.Category = request.Category ?? test.Category;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
