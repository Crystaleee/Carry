package edu.bupt.dmg.mail;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import edu.bupt.dmg.domain.User;

/**
 * 激活邮件发送 
 * 
 * Project Name: VisAna<br>
 * File Name: ActivateMailSender.java<br>
 * Package Name: edu.bupt.dmg.mail<br>
 * Creator: @author Ruitong Chai & Bohao Wang<br>
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class ActivateMailSender {
	private JavaMailSenderImpl mailSender;
	private String mailActivateAddress;

	public void setMailSender(JavaMailSenderImpl mailSender) {
		this.mailSender = mailSender;
	}

	public void setMailActivateAddress(String mailActivateAddress) {
		this.mailActivateAddress = mailActivateAddress;
	}

	/**
	 * 发送邮件
	 * 
	 * @param user
	 * @throws Exception
	 */
	public void send(User user) throws Exception {
		System.out.println("here!!!!!!");
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		helper.setSubject("Account Activate");
		helper.setFrom(mailSender.getUsername());
		helper.setTo(user.getEmail());
		System.out.println(user.getEmail());
		helper.setText("Dear " + user.getName() + ",<br>Thank you for using Carry! <br>Please Click <a href='"
				+ mailActivateAddress + "?UserId=" + user.getUserId() + "&EnableCode=" + user.getEnableCode()
				+ "'>this link</a> to activated your account!", true);
		System.out.println("where???");
		mailSender.send(message);
		System.out.println("here222222!!!!!!");
	}

}
