package edu.bupt.dmg.adapter.impl;

import java.io.BufferedReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import edu.bupt.dmg.adapter.FileAdapter;
import edu.bupt.dmg.formbean.Table;
import edu.bupt.dmg.utils.UnicodeReader;

/**
 * csv文件适配器
 * 
 * Project Name: VisAna<br>
 * File Name: CsvFileAdapter.java<br>
 * Package Name: edu.bupt.dmg.adapter.impl<br>
 * Creator: @author ruitongChai&bohaoWang<br>    
 * Create Time：2017年10月13日<br>
 * Version: @version 0.0.1
 */
public class JsonFileAdapter implements FileAdapter {

	@Override
	public ArrayList<Table> analizeTable(InputStream inputStream) throws Exception {
		BufferedReader br = new BufferedReader(new UnicodeReader(inputStream, "UTF-8"));
		ObjectMapper mapper = new ObjectMapper();
		ArrayNode arrayNode = mapper.readValue(br, ArrayNode.class);
		ArrayList<Table> tableList = new ArrayList<Table>();
		for (JsonNode tableNode : arrayNode) {
			Table sheet = new Table();
			sheet.setTitle(tableNode.get("title").asText());

			ArrayList<String> headers = new ArrayList<String>();
			for (JsonNode headNameNode : (ArrayNode) tableNode.get("headers")) {
				headers.add(headNameNode.asText());
			}

			ArrayNode headerTypesNode = (ArrayNode) tableNode.get("headersType");
			Map<String, String> headType = new LinkedHashMap<String, String>();
			for (int i = 0; i < headerTypesNode.size(); i++) {
				headType.put(headers.get(i), headerTypesNode.get(i).asText());
			}
			sheet.setHeadType(headType);
			
			for (JsonNode itemNode : (ArrayNode) tableNode.get("content")) {
				Map<String, String> item = new LinkedHashMap<String, String>();
				for (int i = 0; i < ((ArrayNode) itemNode).size(); i++) {
					item.put(headers.get(i), itemNode.get(i).asText());
				}
				sheet.getContent().add(item);
			}

			tableList.add(sheet);
		}
		return tableList;
	}
}
