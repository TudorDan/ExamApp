using ExamApp.Data;
using ExamApp.Domain;
using ExamApp.Logic.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace ExamApp.Logic.Questions
{
    public class List
    {
        public class Query : IRequest<List<Question>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Question>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Question>> Handle(Query request, CancellationToken cancellationToken)
            {
                var questions = await _context.Questions.Where(x => x.TestId == request.Id).ToListAsync();
                if (questions == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new 
                    {
                        questions = "Not found"
                    });
                }

                return questions;
            }
        }
    }
}
