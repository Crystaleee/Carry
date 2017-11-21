package edu.bupt.dmg.commons;

import org.dom4j.Document;
import org.dom4j.Node;

import edu.bupt.dmg.utils.ResultMessageXmlUtil;
/**
 * 结果信息
 * 
 * Project Name: VisAna<br> 
 * File Name: ResultMessage.java<br> 
 * Package Name: edu.bupt.dmg.commons<br>       
 * Creator: @author ruitongChai&bohaoWang<br>    
 * Create Time：2017年10月13日<br>
 * Version: @version 0.0.1
 */
public class ResultMessage {
	private Integer resultCode;
	private String resultTips;

	public ResultMessage(Integer resultCode) {
		this.resultCode = resultCode;
		Document document = ResultMessageXmlUtil.getDocument();
		Node node = document.selectSingleNode("//resultMessage[@resultCode='" + resultCode + "']");
		if (node != null) {
			this.resultTips = node.valueOf("@resultTips");
		}
	}

	public ResultMessage(Integer resultCode, String resultTips) {
		this.resultCode = resultCode;
		this.resultTips = resultTips;
	}

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultTips() {
		return resultTips;
	}

	public void setResultTips(String resultTips) {
		this.resultTips = resultTips;
	}
}
