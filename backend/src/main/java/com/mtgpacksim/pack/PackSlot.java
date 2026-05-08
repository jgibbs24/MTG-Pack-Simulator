package com.mtgpacksim.pack;

public record PackSlot(
        String name,
        int count,
        String cacheKey,
        String query,
        String alternateCacheKey,
        String alternateQuery,
        double alternateChance
) {
    public static PackSlot fixed(String name, int count, String cacheKey, String query) {
        return new PackSlot(name, count, cacheKey, query, null, null, 0);
    }

    public static PackSlot rareOrMythic(
            String name,
            String rareCacheKey,
            String rareQuery,
            String mythicCacheKey,
            String mythicQuery,
            double mythicChance
    ) {
        return new PackSlot(name, 1, rareCacheKey, rareQuery, mythicCacheKey, mythicQuery, mythicChance);
    }

    public boolean hasAlternatePool() {
        return alternateCacheKey != null && alternateQuery != null;
    }
}
