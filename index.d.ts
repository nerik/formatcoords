declare module 'formatcoords' {
    interface FormatOptions {
        latLonSeparator?: string
        decimalPlaces?: number
    }

    interface Formatcoords {
        format(format?: string, options?: FormatOptions): string
    }

    function init(
        [lat, lng]: [number, number],
        flipLonLat?: boolean,
    ): Formatcoords
    function init(lat: number, lng: number, flipLonLat?: boolean): Formatcoords
    function init(latlng: string): Formatcoords
    function init({ lat, lng }: { lat: number; lng: number }): Formatcoords

    export default init
}
