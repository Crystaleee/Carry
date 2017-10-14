package edu.bupt.dmg.formbean;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 记录表格中数据的对象，作为与前端交互类
 * 
 * Project Name: VisAna<br/>
 * File Name: Table.java<br/>
 * Package Name: edu.bupt.dmg.formbean<br/>
 * Creator: @author Ruitong Chai & Bohao Wang<br/>
 * Create Time：2017年4月7日<br/>
 * Version: @version 0.0.1
 */
public class Table {
	private String title;
	private Map<String, String> headType;
	private List<Map<String, String>> content;

	public Table() {
		title = "";
		setHeadType(new LinkedHashMap<String, String>());
		content = new ArrayList<Map<String, String>>();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Map<String, String>> getContent() {
		return content;
	}

	public void setData(List<Map<String, String>> data) {
		this.content = data;
	}

	public Map<String, String> getHeadType() {
		return headType;
	}

	public void setHeadType(Map<String, String> headType) {
		this.headType = headType;
	}

}
