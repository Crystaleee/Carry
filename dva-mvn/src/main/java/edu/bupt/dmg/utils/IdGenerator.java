package edu.bupt.dmg.utils;

import java.math.BigInteger;
import java.util.Random;
/**
 * Id生成器
 * 
 * Project Name: VisAna<br> 
 * File Name: IdGenerator.java<br> 
 * Package Name: edu.bupt.dmg.utils<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class IdGenerator {
	/**
	 * 生成GUID
	 * @return String GUID
	 */
	public static String genGUID(){
		return new BigInteger(165, new Random()).toString(36).toUpperCase();
	}
}
