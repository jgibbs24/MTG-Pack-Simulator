package com.mtgpacksim.set;

public record SupportedSetDto(
        String setCode,
        String setName,
        String packType,
        double msrpUsd
) {
}
