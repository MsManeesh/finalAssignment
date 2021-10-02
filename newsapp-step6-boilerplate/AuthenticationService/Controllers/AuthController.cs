using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
namespace AuthenticationService.Controllers
{
    /* Annotate the class with [ApiController] annotation and define the controller level 
     * route as per REST Api standard.
     */
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        /*
         AuthService should  be injected through constructor injection. Please note that we should not create service
         object using the new keyword
        */
        IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /*
       * Define a handler method which will create a specific user by reading the
       * Serialized object from request body and save the user details in the
       * database. This handler method should return any one of the status messages
       * basis on different situations:
       * 1. 201(CREATED) - If the user created successfully. 
       * 2. 409(CONFLICT) - If the userId conflicts with any existing user
       * 
       * This handler method should map to the URL "/api/auth/register" using HTTP POST method
       */
        [HttpPost("register")]
        [ActionName("Post")]
        public IActionResult Register(User user)
        {
            try
            {
                bool flag = _authService.RegisterUser(user);
                return Created("", flag);
            }
            catch(UserAlreadyExistsException e)
            {
                return Conflict(e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        /* Define a handler method which will authenticate a user by reading the Serialized user
        * object from request body containing the username and password. The username and password 
        * should be validated before proceeding ahead with JWT token generation. The user credentials 
        * will be validated against the database entries. 
        * 
        * The error should be return if validation is not successful. If credentials are validated successfully, 
        * then JWT token will be generated. The token should be returned back to the caller along with the API 
        * response. This handler method should return any one of the status messages basis on different
        * situations:
        * 1. 200(OK) - If login is successful
        * 2. 401(UNAUTHORIZED) - If login is not successful
        * 
        * This handler method should map to the URL "/api/auth/login" using HTTP POST method
       */
        [HttpPost("login")]
        [ActionName("Post")]
        public IActionResult Login(User user)
        {
            try
            {
                bool flag = _authService.LoginUser(user);
                if (flag == true)
                {
                    string token = generateToken(user);
                    return Ok(token);
                }
                else throw new UnauthorizedAccessException("Invalid user id or password");
            }
            catch(UnauthorizedAccessException e)
            {
                return Unauthorized(e.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500,e.Message);
            }
        }
        [HttpPost("isAuthenticated")]
        [ActionName("Post")]
        public IActionResult ValidateJwtToken()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("ThisismySecretKey");
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = "Authapi",
                    ValidAudience = "AuthClients",
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                }, out SecurityToken validatedToken);
                return Ok(true);
            }
            catch
            {
                
                return Ok(false);
            }
        }
        string generateToken(User user)
        {
            var claim = new[] { new Claim("userId", user.UserId) };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisismySecretKey"));
            var signature = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "Authapi",
                audience: "AuthClients",
                expires: DateTime.Now.AddMinutes(30),
                claims: claim,
                signingCredentials: signature) ;

            var createdToken =new
            {
                 token=new JwtSecurityTokenHandler().WriteToken(token)
             };
            return JsonConvert.SerializeObject(createdToken);
            //return new JwtSecurityTokenHandler().WriteToken(token).ToString();
        }
    }

}
