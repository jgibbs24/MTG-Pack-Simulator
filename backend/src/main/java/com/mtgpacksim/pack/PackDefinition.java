package com.mtgpacksim.pack;

import java.util.List;

public record PackDefinition(
        String setCode,
        String setName,
        String packType,
        List<PackSlot> slots
) {
}
