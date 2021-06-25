package ch.bbw.mastermind.model;

public class BoardEntry {
    public String username;
    public int score;

    public BoardEntry() {
    }

    public BoardEntry(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public String getUsername() {
        return username;
    }

    public int getScore() {
        return score;
    }
}
