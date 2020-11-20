import { Box } from 'theme-ui'

## Summary

Users of this work-in-progress interactive map can explore committed emissions arising from biomass losses, including losses due to both human and natural causes, such as forest fires, harvesting, conversion, insects, and droughts. Current estimates are based on 30m scale datasets of biomass and forest cover change detection. The map allows users to distill big picture insights into continental-scale committed emissions from fine-scale data.

## Usage

The sidebar on the left lets you specify the year from which to display data, from 2001 to 2018. Clicking the magnifying glass (in the bottom left corner of the map) brings up a circular focus window. Dragging that around sums forest emissions within the highlighted region. The size of the circle can be adjusted by dragging the edge of the circle inward or outward.

## Methods

Here, we briefly describe how we built the committed emissions map. The map is based on several datasets, including the aboveground live woody biomass density (Baccini et al., 2012) and forest cover and forest cover change (Hansen et al., 2013). All the input data is available in public cloud storage, and Python code for reproducing the analyses from those data is available on [GitHub](https://github.com/carbonplan/forest-emissions-tracking). Several Jupyter notebooks are available documenting different aspects of the analysis and are referenced below. We expect to continue to iterate and improve these models over time and will update our code and the description of these methods accordingly.

### Committed emissions (v0)

We implemented a simple accounting model for committed emissions from forest cover loss extending the approach of Zarin et al. (2016) spatially and temporally. Specifically, for any given spatial extent and time duration (`t1` to `t2`), we can use three quantities — existing biomass, forest cover change, and change attribution — to estimate the effective emissions from land use changes. The simplest estimate is:

```
Δ Biomass (t) = TotalBiomass (t) * Δ ForestCover (%)
Emissions (tCO2) = Δ Biomass (t)  * 0.5 (tC/t) * 3.67 (tC02/tC)
```

Where `Δ ForestCover` is the fraction of pixels within the given spatial extent that experienced a stand-replacement disturbance between `t1` and `t2`. The TotalBiomass is estimated as the aboveground biomass at time `t1`. Note that this approach ignores the fate or life cycle of committed emissions, and also does not attribute drivers to biomass loss, which will rely on additional datasets (conversion, harvest, fire, etc.).

### Committed emissions (v1) (coming mid-2021)

Work is currently underway to extend our initial accounting model to include more accurate and frequent estimates of biomass and loss attribution under a common data processing framework. For this version — building off of approaches taken by Wulder et al. (2020) and Wang et al. (in review) and others — we are building biomass and attribution maps directly from spaceborne lidar (e.g. GLAS, GEDI, ICESAT2) and multispectral imagery (e.g. Landsat, MODIS, Sentinel).

## Acknowledgements

These data products and the website were developed by the following contributors (in alphabetical order): Oriana Chegwidden (CarbonPlan), Jeremy Freeman (CarbonPlan), Joe Hamman (CarbonPlan), and Jake Mensch.

The development of this project was funded, in part, through a grant from WattTime to CarbonPlan.

## References

Baccini et al. (2012) Estimated carbon dioxide emissions from tropical deforestation improved by carbon-density maps, Nature Climate Change, [DOI](https://doi.org/10.1038/nclimate1354)

Curtis et al. (2018) Classifying drivers of global forest loss, Science, [DOI](https://doi.org/10.1126/science.aau3445)

Hansen et al. (2013) High-Resolution Global Maps of 21st-Century Forest Cover Change, Science, [DOI](https://doi.org/10.1126/science.1244693)

Hubau, W., et al. (2020) Asynchronous carbon sink saturation in African and Amazonian tropical forests, Nature, [DOI](10.1038/s41586-020-2035-0)

Wang et al. (in review) Disturbance suppresses the aboveground biomass carbon sink in North American boreal forests

Wulder et al. (2020) Biomass status and dynamics over Canada’s forests: Disentangling disturbed area from associated aboveground biomass consequences, Env. Research Letters, [DOI](https://doi.org/10.1088/1748-9326/ab8b11)

Zarin et al. (2016) Can carbon emissions from tropical deforestation drop by 50% in 5 years? Global Change Biology, [DOI](https://doi.org/10.1111/gcb.13153)

export default ({ children }) => <Box>{children}</Box

>
