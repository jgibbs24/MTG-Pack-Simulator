package com.mtgpacksim.set;

import com.mtgpacksim.pack.PackDefinitionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sets")
public class SetController {
    private final PackDefinitionService packDefinitionService;

    public SetController(PackDefinitionService packDefinitionService) {
        this.packDefinitionService = packDefinitionService;
    }

    @GetMapping
    public List<SupportedSetDto> supportedSets() {
        return packDefinitionService.supportedDefinitions().stream()
                .map(definition -> new SupportedSetDto(
                        definition.setCode(),
                        definition.setName(),
                        definition.packType(),
                        definition.msrpUsd()
                ))
                .toList();
    }
}
