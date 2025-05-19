import ModelList from "@/components/modelList"
import { PageType } from "@/store/user"

import Follow from "./follow"

function Favorite() {
  const { favoritePageType, setFavoritePageType } = useUserPageStore()
  const handleTypeChange = (type: PageType) => {
    setFavoritePageType(type)
  }
  const typeSelect = [
    { label: "我的收藏(268)", value: "favorite" },
    { label: "我的关注(21)", value: "follow" },
  ]

  return (
    <div className="w-full p-[0_80px] max-w-[1800px]">
      <div className="flex  items-center text-[20px] font-bold gap-[20px] m-[20px_0]">
        {typeSelect.map((item) => (
          <div
            key={item.value}
            className="cursor-pointer"
            style={{ color: favoritePageType == item.value ? "#1366F0" : "#000" }}
            onClick={() => handleTypeChange(item.value as PageType)}
          >
            {item.label}
          </div>
        ))}
      </div>
      {favoritePageType == "favorite" ? <ModelList searchParams={{ authorId: 6, type: "favorite" }} /> : <Follow />}
    </div>
  )
}

export default Favorite
