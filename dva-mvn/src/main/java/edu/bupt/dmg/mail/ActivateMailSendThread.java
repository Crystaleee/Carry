package edu.bupt.dmg.mail;

import edu.bupt.dmg.domain.User;
/**
 * 激活邮件发送线程
 * 
 * Project Name: VisAna<br> 
 * File Name: ActivateMailSendThread.java<br> 
 * Package Name: edu.bupt.dmg.mail<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class ActivateMailSendThread extends Thread {
	private ActivateMailSender activateMailSender;
	private User user;

	public ActivateMailSendThread(ActivateMailSender activateMailSender, User user) {
		super();
		this.activateMailSender = activateMailSender;
		this.user = user;
	}

	@Override
	public void run() {
		try {
			activateMailSender.send(user);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
