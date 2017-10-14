package edu.bupt.dmg.utils;

public class Stack {
    private Object[] items;
    private int size;
    private int top;

    public Stack(int size){
        items=new Object[size];
        this.size=size;
        top=0;
    }

    public boolean isFull(){
        return top==size;
    }

    public boolean isEmpty(){
        return top==0;
    }

    public Object peak(){
        if(!isEmpty()){
            return items[top-1];
        }
        else{
            throw new IndexOutOfBoundsException("the stack is empty");
        }
    }

    public void push(Object item){
        if(!isFull()){
            items[top++]=item;
        }
        else{
            throw new IndexOutOfBoundsException("the stack is full");
        }
    }

    public Object pop(){
        if(!isEmpty()){
            return items[--top];
        }
        else{
            throw new IndexOutOfBoundsException("the stack is empty");
        }
    }
}
