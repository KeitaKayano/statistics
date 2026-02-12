from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import distributions, samplings

app = FastAPI()

# --- CORSの設定 (Reactからのアクセスを許可) ---
origins = [
    "http://localhost:3000",  # Create React Appの場合
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    distributions.router, prefix="/api/distribution", tags=["distributions"]
)
app.include_router(samplings.router, prefix="/api/sampling", tags=["samplings"])
