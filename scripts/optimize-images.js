import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'src', 'assets');
const PROJECTS_FILE = path.join(ROOT_DIR, 'src', 'data', 'projects.js');
const HOME_FILE = path.join(ROOT_DIR, 'src', 'pages', 'Home.jsx');

async function processImages() {
    console.log('Starting image optimization...');

    // 1. Get all images
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Assets directory not found!');
        return;
    }

    const files = fs.readdirSync(ASSETS_DIR);
    const imageFiles = files.filter(file => /\.(png|jpe?g)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to convert.`);

    const conversions = [];

    // 2. Convert to WebP
    for (const file of imageFiles) {
        const inputPath = path.join(ASSETS_DIR, file);
        const outputFilename = file.replace(/\.(png|jpe?g)$/i, '.webp');
        const outputPath = path.join(ASSETS_DIR, outputFilename);

        if (!fs.existsSync(outputPath)) {
            console.log(`Converting ${file} -> ${outputFilename}`);
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                conversions.push({ original: file, webp: outputFilename });
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        } else {
            console.log(`Skipping ${file} (WebP already exists)`);
            conversions.push({ original: file, webp: outputFilename });
        }
    }

    // 3. Update Code References
    const updateFile = (filePath) => {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        conversions.forEach(({ original, webp }) => {
            // Regex to replace imports: import x from '../assets/foo.png' -> foo.webp
            // Also handles strings if used directly, though mostly imports here.

            // Escape dots for regex
            const originalEscaped = original.replace(/\./g, '\\.');
            const regex = new RegExp(originalEscaped, 'g');

            if (regex.test(content)) {
                content = content.replace(regex, webp);
                updated = true;
                console.log(`Updated reference in ${path.basename(filePath)}: ${original} -> ${webp}`);
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Saved updates to ${path.basename(filePath)}`);
        }
    };

    updateFile(PROJECTS_FILE);
    updateFile(HOME_FILE); // For profile image reference

    console.log('Optimization complete!');
}

processImages().catch(console.error);
