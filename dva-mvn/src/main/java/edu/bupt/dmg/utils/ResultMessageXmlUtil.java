package edu.bupt.dmg.utils;

import java.net.URL;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
/**
 * ResultMessageXML工具类
 * 
 * Project Name: VisAna<br> 
 * File Name: ResultMessageXmlUtil.java<br> 
 * Package Name: edu.bupt.dmg.utils<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class ResultMessageXmlUtil {
	private static String filePath;

	static {
		ClassLoader cl = ResultMessageXmlUtil.class.getClassLoader();
		URL url = cl.getResource("resultMessage.xml");
		filePath = url.getPath();
	}

	public static Document getDocument(){
		SAXReader reader = new SAXReader();
		try {
			return reader.read(filePath);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return null;
	}

}
