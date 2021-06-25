package ch.bbw.mastermind.controller;

import ch.bbw.mastermind.model.BoardEntry;
import ch.bbw.mastermind.service.ScoreStore;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScoreBoardController {

    private final ScoreStore store;

    public ScoreBoardController(ScoreStore store) {
        this.store = store;
    }

    @PostMapping(value = "/score")
    public void setScore(@RequestBody BoardEntry entry) {
        this.store.put(entry);
    }

    @GetMapping(value = "/score")
    public List<BoardEntry> getLeaderboard() {
        return this.store.getAll();
    }
}
