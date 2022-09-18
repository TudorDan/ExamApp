using ExamApp.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExamApp.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Xenophon",
                        UserName = "xenophon",
                        Email = "xenophon@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Plutarch",
                        UserName = "plutarch",
                        Email = "plutarch@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Suetonius",
                        UserName = "suetonius",
                        Email = "suetonius@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Tests.Any())
            {
                var tests = new List<Test>
                {
                    new Test
                    {
                        Title = "Erholungsmöglichkeiten, Ausbildungen für die Auswanderung",
                        Description = "Zertifikat Deutsch, B1",
                        Category = "languages",
                        Creation = DateTime.Now.AddMonths(-2)
                    },                    
                    new Test
                    {
                        Title = "Integrale, Polinoame si Progresii",
                        Description = "Matematica, Clasa a XII-a",
                        Category = "science",
                        Creation = DateTime.Now.AddMonths(-3)
                    },
                    new Test
                    {
                        Title = "Structuri trofice in ecosisteme antropizate",
                        Description = "Biologie, Clasa a XII-a",
                        Category = "science",
                        Creation = DateTime.Now.AddDays(-55)
                    },                    
                    new Test
                    {
                        Title = "Derivati functionali ai acizilor carboxilici",
                        Description = "Chimie, Clasa a XII-a",
                        Category = "science",
                        Creation = DateTime.Now.AddDays(-50)
                    },
                    new Test
                    {
                        Title = "Simbolism, Modernism in textul poetic si proza narativa",
                        Description = "Limba Romana, Clasa a XII-a",
                        Category = "humanities",
                        Creation = DateTime.Now.AddMonths(-3)
                    },
                    new Test
                    {
                        Title = "Termodinamica si Electromagnetism",
                        Description = "Fizica, Clasa a XII-a",
                        Category = "science",
                        Creation = DateTime.Now.AddDays(-40)
                    },
                    new Test
                    {
                        Title = "Roci vulcanice",
                        Description = "Geografie, Clasa a X-a",
                        Category = "humanities",
                        Creation = DateTime.Now.AddDays(-35)
                    },
                    new Test
                    {
                        Title = "Provincia romana Dacia",
                        Description = "Istorie veche a romanilor",
                        Category = "humanities",
                        Creation = DateTime.Now.AddMonths(-1)
                    },
                    new Test
                    {
                        Title = "Chestionar auto nr. 1 / 2021",
                        Description = "Permise categoria B",
                        Category = "diverse",
                        Creation = DateTime.Now.AddDays(-27)
                    },
                    new Test
                    {
                        Title = "Test de inteligenta nr. 2 / 2021",
                        Description = "IQ",
                        Category = "diverse",
                        Creation = DateTime.Now.AddDays(-25)
                    },
                    new Test
                    {
                        Title = "Test de personalitate nr. 3 /2021",
                        Description = "Psihologie",
                        Category = "personality",
                        Creation = DateTime.Now.AddDays(-20)
                    },
                };

                context.Tests.AddRange(tests);
                context.SaveChanges();
            }
        }
    }
}
