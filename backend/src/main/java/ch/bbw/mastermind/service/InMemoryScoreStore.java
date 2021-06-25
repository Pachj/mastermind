package ch.bbw.mastermind.service;

import ch.bbw.mastermind.model.BoardEntry;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InMemoryScoreStore implements ScoreStore {

    private final Map<String, BoardEntry> store = new HashMap<>();

    @Override
    public void put(BoardEntry entry) {
        this.store.put(entry.getUsername(), entry);
    }

    @Override
    public BoardEntry get(String username) {
        return store.get(username);
    }

    @Override
    public List<BoardEntry> getAll() {
        return new ArrayList<>(this.store.values());
    }
}
