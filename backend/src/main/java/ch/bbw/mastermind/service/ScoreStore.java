package ch.bbw.mastermind.service;

import ch.bbw.mastermind.model.BoardEntry;

import java.util.List;

public interface ScoreStore {

    void put(BoardEntry entry);

    BoardEntry get(String username);

    List<BoardEntry> getAll();
}
