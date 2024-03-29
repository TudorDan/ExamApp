﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamApp.Data.Migrations
{
    public partial class AddTestCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Creation",
                table: "Tests",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Creation",
                table: "Tests");
        }
    }
}
