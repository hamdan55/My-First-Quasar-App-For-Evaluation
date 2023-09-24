<template>
  <div class="q-pa-md text-center">
    <div class="q-mb-md" style="  display: flex; justify-content: space-around;">
     
      <q-input
      v-model="searchQuery"
      @input="searchArticles"
      label="Search News"
      outlined
      style="flex: 1; margin-right: 10px; max-width: 250px;"
    ></q-input>
    <q-input
      v-model="searchDate"
      @input="searchArticles"
      label="Filter by Date"
      type="date"
      outlined
      style="flex: 1; margin-left: 10px; max-width: 250px;"
    ></q-input>
    <q-pagination
      v-model="currentPage"
      :max="totalPages"
      @input="paginate"
      :side-links="2"
      ></q-pagination>
  </div>
    <div v-if="loading">Loading...</div>
    <div v-else class="q-mt-md">
      <q-list class="q-mt-md q-pb-md">
        <q-item
          clickable
          v-for="article in displayedArticles"
          :key="article.description"
          @click="viewArticleDetails(article)"
          class="q-mb-md"
        >
          <q-item-section>
            <q-item-label class="q-item-label-border">{{ article.title }}</q-item-label>
            <q-item-label caption class="q-item-label-outline">{{ article.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchDate: "", 
      articles: [],
      loading: false,
      apiUrl: "https://newsapi.org/v2/everything?q=uk&apiKey=a421b6b43bf44f08a528c49ee39eefac",
      currentPage: 1, 
      itemsPerPage: 10, 
      filteredArticles: []
    };
  },
  mounted() {
    this.getAllNews();
  },
  computed: {
  totalPages() {
    return Math.ceil(this.articles.length / this.itemsPerPage);
  },
  displayedArticles() {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return this.articles.slice(startIdx, endIdx);
  },
},

  methods: {
    paginate() {
    // Update the displayed articles based on the current page
    // You can also fetch data from the API for the current page if needed
      },
    getAllNews() {
      this.articles = [];
      fetch(this.constructApiUrl())
        .then((response) => response.json())
        .then((data) => {
          this.articles = data.articles;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching news articles:", error);
          this.loading = false;
        });
    },
    searchArticles() {
      this.loading = true;
      fetch(this.constructApiUrl())
        .then((response) => response.json())
        .then((data) => {
          this.articles = data.articles;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching news articles:", error);
          this.loading = false;
        });
    },
    viewArticleDetails(article) {
      this.$router.push({ name: "news-details", params: { article } });
    },
    constructApiUrl() {
      const baseApiUrl = "https://newsapi.org/v2/everything";
      const apiKey = "a421b6b43bf44f08a528c49ee39eefac";
      let apiUrl = `${baseApiUrl}?q=${this.searchQuery ? this.searchQuery : "uk"}`;

      // Check if a date filter is specified
      if (this.searchDate) {
        apiUrl += `&from=${this.searchDate}`;
      }

      apiUrl += `&apiKey=${apiKey}`;

      return apiUrl;
    },
  },
};
</script>
