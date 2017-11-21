package edu.bupt.dmg.utils;


import java.util.ArrayList;

public class Converter {
    //输入的中缀表达式、存储栈、输出的后缀表达式
    private ArrayList expre;
    private Stack stack;
    private ArrayList outExpre;

    public ArrayList getOutExpre(){
        return this.outExpre;
    }

    public void setExpre(ArrayList expre){
        init(expre);
    }

    //初始化参数
    public void init(ArrayList expre){
        this.expre=new ArrayList(expre);
        stack=new Stack(expre.size());
        outExpre=new ArrayList();
    }

    public Converter(ArrayList expre){
        init(expre);
    }

    //转换器
    public void convert(){

        for(int i=0;i<expre.size();i++){
            String cr=expre.get(i).toString();
            //System.out.println(expre.size());
            switch(cr){
                case "+":
                    forOper(cr,1);
                    break;
                case "-":
                    forOper(cr,1);
                    break;
                case "*":
                    forOper(cr,2);
                    break;
                case "/":
                    forOper(cr,2);
                    break;
                case "(":
                    stack.push(cr);
                    break;
                case "（":
                    stack.push(cr);
                    break;
                case ")":
                    forBra();
                    break;
                case "）":
                    forBra();
                    break;
                default:
                    outExpre.add(cr);
                    //System.out.println("!");
                    break;
            }
        }
        while(!stack.isEmpty()){
            outExpre.add(stack.pop());
            //System.out.println("@");
        }
    }

    //括号处理
    private void forBra() {
        while (!stack.isEmpty()) {
            String topOper = (String) stack.pop();
            if(topOper.equals("(")||topOper.equals("（")){
                break;
            }
            else{
                outExpre.add(topOper);
                //System.out.println("#");
            }
        }
    }

    //操作符处理--thisWt：操作符的权重
    private void forOper(String thisOper,int thisWt){
        while(!stack.isEmpty()){
            String topOper=(String) stack.pop();
            if(topOper.equals("(")||topOper.equals("（")){
                stack.push(topOper);
                break;
            }
            else{
                int topWt=2;
                if(topOper.equals("+")||topOper.equals("-")){
                    topWt=1;
                }
                if(topWt<thisWt){
                    stack.push(topOper);
                    break;
                }
                else{
                    outExpre.add(topOper);
                   // System.out.println("$");
                }
            }
        }
        stack.push(thisOper);
    }
}
