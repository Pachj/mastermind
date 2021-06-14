package ch.bbw.mastermind;

import java.util.ArrayList;

public class Game {
    private int numberOfRows;
    private ArrayList<Row> rows;

    public Game(int numberOfRows) {
        this.numberOfRows = numberOfRows;
        for (int i = 0; i < numberOfRows; i++) {
            addEmptyRow();
        }
    }

    public int getNumberOfRows() {
        return numberOfRows;
    }

    public void setNumberOfRows(int numberOfRows) {
        this.numberOfRows = numberOfRows;
    }

    public ArrayList<Row> getRows() {
        return rows;
    }

    public void setRows(ArrayList<Row> rows) {
        this.rows = rows;
    }

    public void addEmptyRow() {
        this.rows.add(new Row());
    }
}
