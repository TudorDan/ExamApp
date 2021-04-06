using ExamApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ExamApp.Data
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Tests.Any())
            {
                var tests = new List<Test>
                {                    
                    new Test
                    {
                        Title = "Erholungsmöglichkeiten, Ausbildungen für die Auswanderung",
                        Description = "Zertifikat Deutsch, B1",
                        Category = "languages"
                    },                    
                    new Test
                    {
                        Title = "Integrale, Polinoame si Progresii",
                        Description = "Matematica, Clasa a XII-a",
                        Category = "science"
                    },
                    new Test
                    {
                        Title = "Structuri trofice in ecosisteme antropizate",
                        Description = "Biologie, Clasa a XII-a",
                        Category = "science"
                    },                    
                    new Test
                    {
                        Title = "Derivati functionali ai acizilor carboxilici",
                        Description = "Chimie, Clasa a XII-a",
                        Category = "science"
                    },
                    new Test
                    {
                        Title = "Simbolism, Modernism in textul poetic si proza narativa",
                        Description = "Limba Romana, Clasa a XII-a",
                        Category = "humanities"
                    },
                    new Test
                    {
                        Title = "Termodinamica si Electromagnetism",
                        Description = "Fizica, Clasa a XII-a",
                        Category = "science"
                    },
                    new Test
                    {
                        Title = "Roci vulcanice",
                        Description = "Geografie, Clasa a X-a",
                        Category = "humanities"
                    },
                    new Test
                    {
                        Title = "Provincia romana Dacia",
                        Description = "Istorie veche a romanilor",
                        Category = "humanities"
                    },
                    new Test
                    {
                        Title = "Chestionar auto nr. 1 / 2021",
                        Description = "Permise categoria B",
                        Category = "diverse"
                    },
                    new Test
                    {
                        Title = "Test de inteligenta nr. 2 / 2021",
                        Description = "IQ",
                        Category = "diverse"
                    },
                    new Test
                    {
                        Title = "Test de personalitate nr. 3 /2021",
                        Description = "Psihologie",
                        Category = "personality"
                    },
                };

                context.Tests.AddRange(tests);
                context.SaveChanges();
            }
        }
    }
}
