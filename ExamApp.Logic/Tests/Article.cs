using ExamApp.Data;
using ExamApp.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Tests
{
    public class Article
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

                return test;
            }
        }
    }
}
