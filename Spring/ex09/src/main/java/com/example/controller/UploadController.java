package com.example.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class UploadController {
	
	@Resource(name="uploadPath")
	private String path;
	
	
	@RequestMapping("formUpload")
	public void formUpload(){
		
	}
	
	@RequestMapping("ajaxUpload")
	public void uploadAjax(){
		
	}
	
	@RequestMapping(value="formUpload",method=RequestMethod.POST)
	public void formUploadPost(MultipartFile file) throws Exception{
		System.out.println("ㅗㅗㅗㅗㅗ");
		System.out.println("path......."+ path);
		
		
		UUID uid=UUID.randomUUID();
		String saveName=uid.toString() + "_" + file.getOriginalFilename();
		System.out.println("파일명: "+ saveName);
		
		File target = new File(path,saveName);
		FileCopyUtils.copy(file.getBytes(),target);
		
	}
	@ResponseBody
	@RequestMapping(value="uploadFile",method=RequestMethod.POST)
	public String uploadAjax(MultipartFile file) throws Exception{
		
		UUID uid=UUID.randomUUID();
		String saveName=uid.toString() + "_" + file.getOriginalFilename();
		System.out.println("파일명: "+ saveName);
		
		File target = new File(path,saveName);
		FileCopyUtils.copy(file.getBytes(),target);
		
		return saveName;
	}
	@ResponseBody
	@RequestMapping(value="deleteFile",method=RequestMethod.POST)
	public void deleteFile(String fileName){
		new File(path + "/" + fileName).delete();
	}
	@ResponseBody
	@RequestMapping(value="displayFile")
	public byte[] displayFile(String fileName)throws Exception{
		FileInputStream in= new FileInputStream(path + "/" + fileName);
		byte[] image= IOUtils.toByteArray(in);
		in.close();
		return image;
	}
	
}
