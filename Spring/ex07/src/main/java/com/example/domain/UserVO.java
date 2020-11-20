package com.example.domain;



public class UserVO {

	private int point;
	private String uid;
	private String upw;
	private String uname;
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUpw() {
		return upw;
	}
	public void setUpw(String upw) {
		this.upw = upw;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	@Override
	public String toString() {
		return "UserVO [point=" + point + ", uid=" + uid + ", upw=" + upw + ", uname=" + uname + "]";
	}
	
	
}
