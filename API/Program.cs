using BL.Logger;
using Common.AppSettings;
using Common.Interfaces;
using DA.Context;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Utils;

var builder = WebApplication.CreateBuilder(args);

var AppSettings = builder.Configuration.GetConfiguration<AppSettings>();

builder.Services.AddSingleton<IAppSettings>(AppSettings);
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddHangfire((sp, config) =>
{
    config.UseSqlServerStorage(AppSettings.DBConnectionString);
});
builder.Services.AddHangfireServer();

builder.Services.AddDbContext<PowerAppContext>(
    options => options.UseSqlServer(AppSettings.DBConnectionString)
    .LogTo(Console.WriteLine, LogLevel.Information));


builder.Services.AddAuthentication("auth")
            .AddJwtBearer("auth", o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = AppSettings.AuthSettings.Issuer,
                    ValidAudience = AppSettings.AuthSettings.Issuer,

                    IssuerSigningKeys = new List<SecurityKey>
                    {
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AppSettings.AuthSettings.SymmetricSecurityKey))
                    }
                };
            });
builder.Services.AddAuthorization();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddTransient(s =>
{
    var contextAccesor = s.GetService<IHttpContextAccessor>() ?? throw new ArgumentNullException();
    var context = contextAccesor.HttpContext;
    return context?.User ?? new ClaimsPrincipal();
});

builder.Services.AddDerivedFrom<IUnitOfWork>(builder.Services.AddScoped);
builder.Services.AddDerivedFrom<IService>(builder.Services.AddScoped);

builder.Services.AddAutoMapper();
builder.Services.AddValidator();
builder.Services.AddScoped<ILogger, Logger>();

var app = builder.Build();
app.UseLoggerMiddleware();

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();
app.UseCors(c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseHangfireDashboard();
app.Run();
