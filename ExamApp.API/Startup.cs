using ExamApp.API.Middleware;
using ExamApp.Data;
using ExamApp.Logic.Tests;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace ExamApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:44333");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddControllers()
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Create>());

            services.AddSwaggerGen(setupAction =>
            {
                setupAction.CustomSchemaIds(type => type.FullName);
                setupAction.SwaggerDoc(
                    "ExamAppOpenAPISpecification", 
                    new OpenApiInfo 
                    {
                        Title = "ExamApp API",
                        Version = "1.0"
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(setupAction =>
                {
                    setupAction.SwaggerEndpoint(
                        "/swagger/ExamAppOpenAPISpecification/swagger.json",
                        "ExamApp API");
                });
            }

            //app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
