using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamApp.Data.Migrations
{
    public partial class AddTestCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Tests",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Tests");
        }
    }
}
