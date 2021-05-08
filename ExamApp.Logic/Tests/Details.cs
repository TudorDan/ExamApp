using ExamApp.Data;
using ExamApp.Domain;
using ExamApp.Logic.Errors;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Tests
{
    public class Details
    {
        public class Query : IRequest<Test>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Test>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Test> Handle(Query request, CancellationToken cancellationToken)
            {
                var test = await _context.Tests.FindAsync(request.Id);

                if (test == null)
                    throw new RestException(HttpStatusCode.NotFound, new
                    {
                        activity = "Not found"
                    });

                return test;
            }
        }
    }
}
