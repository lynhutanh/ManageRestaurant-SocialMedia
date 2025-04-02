import { ICardItem } from "../types/card";
import '../css/index.css'
interface CardContentProps {
    item: ICardItem;
}

const CardContent = (props: CardContentProps) => {
    const { item } = props;
    return (
        <div className="w-full h-full  overflow-x-hidden">
            <div className="flex flex-col items-center justify-start gap-4 px-24">
                <span className="w-full text-2xl font-semibold text-primary">
                    {item.title}
                </span>
                <div className="custom-text" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <div className="w-full h-auto flex justify-center items-center border shadow-md rounded-md">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-auto h-[300px] object-cover"
                    />
                </div>
                {
                    item.text2 && (
                        <div className="custom-text" dangerouslySetInnerHTML={{ __html: item.text2 }}></div>
                    )
                }
                {
                    item.image2 && (
                        <div className="w-full h-auto flex justify-center items-center border shadow-md rounded-md">
                            <img
                                src={item.image2}
                                alt={item.title}
                                className="w-auto h-full object-cover"
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CardContent;
