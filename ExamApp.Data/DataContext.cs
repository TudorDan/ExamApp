﻿using ExamApp.Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace ExamApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Test> Tests { get; set; }
    }
}
