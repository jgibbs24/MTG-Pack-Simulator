package com.mtgpacksim.pack;

import com.mtgpacksim.card.CardDto;
import com.mtgpacksim.scryfall.ScryfallClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PackOpeningService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PackOpeningService.class);

    private final ScryfallClient scryfallClient;
    private final PackDefinitionService packDefinitionService;
    private final Map<String, List<CardDto>> cardPoolCache = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public PackOpeningService(ScryfallClient scryfallClient, PackDefinitionService packDefinitionService) {
        this.scryfallClient = scryfallClient;
        this.packDefinitionService = packDefinitionService;
    }

    public OpenedPackDto openBloomburrowPack() {
        return openPack("blb");
    }

    public OpenedPackDto openPack(String setCode) {
        PackDefinition definition = packDefinitionService.getDefinition(setCode);
        List<CardDto> cards = new ArrayList<>();

        for (PackSlot slot : definition.slots()) {
            cards.addAll(drawSlot(slot));
        }

        BigDecimal totalValueUsd = cards.stream()
                .map(CardDto::priceUsd)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        return new OpenedPackDto(definition.setCode(), cards, totalValueUsd);
    }

    private List<CardDto> drawSlot(PackSlot slot) {
        boolean useAlternatePool = slot.hasAlternatePool() && random.nextDouble() < slot.alternateChance();
        String cacheKey = useAlternatePool ? slot.alternateCacheKey() : slot.cacheKey();
        String query = useAlternatePool ? slot.alternateQuery() : slot.query();
        return drawCards(cacheKey, query, slot.count());
    }

    private List<CardDto> drawCards(String cacheKey, String query, int count) {
        List<CardDto> pool = new ArrayList<>(cardPool(cacheKey, query));
        if (pool.size() < count) {
            throw new PackOpeningException("Not enough cards were available for pack slot: " + cacheKey);
        }
        Collections.shuffle(pool, random);
        return pool.subList(0, count);
    }

    private List<CardDto> cardPool(String cacheKey, String query) {
        return cardPoolCache.computeIfAbsent(cacheKey, ignored -> loadCardPool(cacheKey, query));
    }

    private List<CardDto> loadCardPool(String cacheKey, String query) {
        LOGGER.info("Loading Scryfall card pool '{}' with query '{}'.", cacheKey, query);
        List<CardDto> cards = scryfallClient.searchCards(query);
        if (cards.isEmpty()) {
            throw new PackOpeningException("No cards were returned for pack slot: " + cacheKey);
        }
        LOGGER.info("Cached {} cards for Scryfall card pool '{}'.", cards.size(), cacheKey);
        return List.copyOf(cards);
    }
}
