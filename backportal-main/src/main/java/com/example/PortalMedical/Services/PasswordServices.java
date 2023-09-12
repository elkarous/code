package com.example.PortalMedical.Services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.PortalMedical.DTO.ResetPassword;
import com.example.PortalMedical.DTO.UserDTO;
import com.example.PortalMedical.enteties.RendezVousEntity;
import com.example.PortalMedical.security.jwt.JwtUtil;

@Service
public class PasswordServices {

    @Autowired
    UserService userService;
    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    JwtUtil jwtUtil;
    public void resetPassword(ResetPassword resetPassword, String email) {
    	
        UserDTO user= userService.getUserByEmail(email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(resetPassword.getPassword());
        user.setPassword(encodedPassword);
        //user.setPassword(resetPassword.getPassword());
        userService.updateUser(user);


    }

    public void sendEmail(String email) throws MessagingException {
        UserDTO user = userService.getUserByEmail(email);
        if(user!=null) {


            MimeMessage message = emailSender.createMimeMessage();

            boolean multipart = true;

            MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

            String htmlMsg = "<h2>Forgot password</h3>"
                    +"<h3>Password:</h2><url>"+"http://localhost:4200/resetPassword/"+ jwtUtil.generateTokenByEmail(email)+"</url>";

            message.setContent(htmlMsg, "text/html");

            helper.setTo(email);

            helper.setSubject("Password");

            this.emailSender.send(message);
        }
    }
    public void EnvoyerEmailAjout(RendezVousEntity rdv) {
		MimeMessage mimeMessage = emailSender.createMimeMessage();
		try {

		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

		mimeMessageHelper.setSubject("Bienvenue a notre Portal Medical ");
		mimeMessageHelper.setFrom("contact@dsms.world");
		mimeMessageHelper.setTo(rdv.getPatientEmail());
		String content = "Bonjour ( Mme/M), "+ 
		"\n"
		+ "<br>votre demande de rendez vous est confirmer pour: \n" 
		
		+ " <br><br> date:"+rdv.getDateOfApt().toLocaleString()
		+ " <br><br> avec docteur : "+rdv.getUser().getNom() +" " +rdv.getUser().getPrenom()
		+ " <br><br> Cordialement,";

		mimeMessageHelper.setText(content);
		mimeMessageHelper.setText("<html><body><p>" + content
		+ "</p> <img width=\"50\" alt=\"Apen\"></body></html>",
		true);
		emailSender.send(mimeMessageHelper.getMimeMessage());
		} catch (MessagingException e) {
		e.printStackTrace();
		}

		}
    public void EnvoyerEmailRefuser(RendezVousEntity rdv) {
		MimeMessage mimeMessage = emailSender.createMimeMessage();
		try {

		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

		mimeMessageHelper.setSubject("Bienvenue a notre Portal Medical ");
		mimeMessageHelper.setFrom("contact@dsms.world");
		mimeMessageHelper.setTo(rdv.getPatientEmail());
		String content = "Bonjour ( Mme/M), "+ 
		"\n"
		+ "<br> desolé votre demande de rendez vous est annulée pour: \n" 
		
		+ " <br><br> date:"+rdv.getDateOfApt().toLocaleString()
		+ " <br><br> avec docteur : "+rdv.getUser().getNom() +" " +rdv.getUser().getPrenom()
		+"<br><br> vous devez nous recontacter , merci pour votre compréhension"
		+ " <br><br> Cordialement,";

		mimeMessageHelper.setText(content);
		mimeMessageHelper.setText("<html><body><p>" + content
		+ "</p> <img width=\"50\" alt=\"Apen\"></body></html>",
		true);
		emailSender.send(mimeMessageHelper.getMimeMessage());
		} catch (MessagingException e) {
		e.printStackTrace();
		}

		}

}
