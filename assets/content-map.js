// assets/content-map.js

const contentMap = {
  siteTitle: "爱游戏",
  baseUrl: "https://appindex-aiyouxi.com.cn",
  sections: [
    {
      id: "section-1",
      title: "热门游戏",
      tags: ["动作", "冒险", "角色扮演"],
      items: [
        { name: "幻境传说", category: "角色扮演", tags: ["魔幻", "剧情"] },
        { name: "极速飙车", category: "竞速", tags: ["赛车", "多人"] }
      ]
    },
    {
      id: "section-2",
      title: "休闲益智",
      tags: ["解谜", "消除", "策略"],
      items: [
        { name: "方块消消乐", category: "消除", tags: ["休闲", "单机"] },
        { name: "迷宫逃脱", category: "解谜", tags: ["烧脑", "关卡"] }
      ]
    },
    {
      id: "section-3",
      title: "最新发布",
      tags: ["新游", "更新", "活动"],
      items: [
        { name: "星域探险", category: "冒险", tags: ["科幻", "开放世界"] },
        { name: "英雄对决", category: "卡牌", tags: ["策略", "对战"] }
      ]
    }
  ]
};

function filterContentByTag(tag) {
  const results = [];
  for (const section of contentMap.sections) {
    for (const item of section.items) {
      if (item.tags.includes(tag)) {
        results.push({
          sectionTitle: section.title,
          itemName: item.name,
          itemCategory: item.category,
          matchedTag: tag
        });
      }
    }
  }
  return results;
}

function filterContentByCategory(category) {
  const results = [];
  for (const section of contentMap.sections) {
    for (const item of section.items) {
      if (item.category === category) {
        results.push({
          sectionTitle: section.title,
          itemName: item.name,
          itemCategory: item.category
        });
      }
    }
  }
  return results;
}

function searchContent(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  for (const section of contentMap.sections) {
    for (const item of section.items) {
      const nameMatch = item.name.toLowerCase().includes(lowerQuery);
      const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
      if (nameMatch || categoryMatch || tagMatch) {
        results.push({
          sectionTitle: section.title,
          itemName: item.name,
          itemCategory: item.category,
          itemTags: item.tags
        });
      }
    }
  }
  return results;
}

function getSectionByTitle(title) {
  for (const section of contentMap.sections) {
    if (section.title === title) {
      return section;
    }
  }
  return null;
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of contentMap.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
    for (const item of section.items) {
      for (const tag of item.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet);
}

function generateTagCloud() {
  const tagCountMap = {};
  for (const section of contentMap.sections) {
    for (const tag of section.tags) {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
    }
    for (const item of section.items) {
      for (const tag of item.tags) {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      }
    }
  }
  const cloud = [];
  for (const [tag, count] of Object.entries(tagCountMap)) {
    cloud.push({ tag, count });
  }
  cloud.sort((a, b) => b.count - a.count);
  return cloud;
}

export {
  contentMap,
  filterContentByTag,
  filterContentByCategory,
  searchContent,
  getSectionByTitle,
  getAllTags,
  generateTagCloud
};