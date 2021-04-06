using ExamApp.Data;
using ExamApp.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Tests
{
    public class List
    {
        public class Query : IRequest<List<Test>> { }

        public class Handler : IRequestHandler<Query, List<Test>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Test>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tests = await _context.Tests.ToListAsync();

                return tests;
            }
        }
    }
}
