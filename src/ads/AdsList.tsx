import { FC, ReactElement, useRef, useEffect, useState } from "react";
import { CreateAdDto, Client, AdLookupDto } from "../api/api";
import { FormControl } from "react-bootstrap";

const apiClient = new Client('https://localhost:7273');

async function createAd(ad: CreateAdDto) {
    await apiClient.create('1.0', ad);
    console.log('ad is created')
}

const AdList: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const [ads, setNotes] = useState<AdLookupDto[] | undefined>(undefined);

    async function getAds() {
        const adistVm = await apiClient.getAll('1.0');
        setNotes(adistVm.ads);
    }

    useEffect(() => {
        setTimeout(getAds, 500);
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const ad: CreateAdDto = {
                name: event.currentTarget.value,
                description: event.currentTarget.value,
                price: event.currentTarget.valueAsNumber
            };
            createAd(ad);
            event.currentTarget.value = '';
            setTimeout(getAds, 500);
        }
    };

    return (
        <div>
            Ad
            <div>
                <FormControl ref={textInput} onKeyPress={handleKeyPress} />
            </div>
            <section>
                {ads?.map((ad) => (
                    <div>{ad.name}</div>
                ))}
            </section>
        </div>
    );
};
export default AdList;
